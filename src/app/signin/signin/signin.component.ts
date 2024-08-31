import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { SigninService } from 'src/app/services/signin.service';
import { PrimeNGConfig } from "primeng/api";
import { designations } from 'src/app/api/api-config';
import { User } from 'src/app/model/user.model';

interface loginModel {
  email?: string,
  phone?: string,
  password?: string
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup = new FormGroup({});
  public signUpForm: FormGroup = new FormGroup({});

  private destroy = new Subject<void>();

  loading: boolean = false;
  logoImage: any;
  successLogo: any;
  hidePassword: boolean = true;
  passwordText: any = 'show'

  showPasswordField: boolean = true;
  showOrText: boolean = true;
  emailField: boolean = true;
  phoneField: boolean = true;
  showButton: boolean = true;
  isLoginSuccess: boolean = true;
  isMainContainer: boolean = true;
  isSignUpform: boolean = true;
  stepOne: boolean = true;
  isBack: boolean = true;
  loginModel: loginModel = {}
  designation: any = designations;
  backLogo: any;
  userDetails: any;
  signUpModel: User = {};
  isSignUpSuccess: boolean = true;
  btnDisable: boolean = true;
  constructor(private formBuilder: FormBuilder,
    private signinService: SigninService, private commonService: CommonService, private primengConfig: PrimeNGConfig) { }


  ngOnInit(): void {
    // this.logoImage = './assets/signin.png';
    this.logoImage = './assets/signin_svg.svg';
    this.backLogo = './assets/back-button.png';
    this.buildForm();
    this.primengConfig.ripple = true;
  }

  private loadSpinner(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false
    }, 1000);
  }


  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('^[6-9][0-9]{9}$')
      ]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      mobile: ['', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('^[6-9][0-9]{9}$')
      ]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      designation: ['', [Validators.required]],
      date: ['', [Validators.required]],
      city: ['', [Validators.required]],
      orgname: ['', [Validators.required]],
      orgId: ['', [Validators.required]],
      pincode: ['', [Validators.pattern(/^\d{0,6}$/), Validators.maxLength(6)]]
    });
  }

  public toggleForm(): void {
    this.isSignUpform = false;
    this.isMainContainer = false;
  }

  public toggleSignUpForm(): void {
    this.isSignUpform = true;
    this.isMainContainer = true;
    this.isBack = true;
  }



  public togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  public getUserDetails(): void {
    this.loginModel.email = this.loginForm.get('email')?.value;
    this.loginModel.phone = this.loginForm.get('phone')?.value;

    if (!this.loginModel.email && !this.loginModel.phone) {
      this.commonService.handleError('Please enter Email Id or Mobile No.');
      return;
    }
    this.loadSpinner();

    let emailAPI;
    let mobileAPI;
    if (this.loginModel.email) {
      emailAPI = this.signinService.getUserByEmailPhone(this.loginModel.email);
      this.emailField = true;
      emailAPI.pipe(takeUntil(this.destroy)).subscribe({
        next: response => {
          if (response && response.code === 200) {
            this.userDetails = response.data;
            this.showOrText = false;
            this.showPasswordField = false;
            this.showButton = false;
            this.phoneField = false;

          } else if (response && response.code === 404) {
            this.handleUserNotFound();
          }
        },
        error: err => {
          this.showOrText = true;
          this.emailField = true;
          this.phoneField = true;
          this.commonService.handleError('An error occurred while fetching user details.');
        }
      });

    }
    else if (this.loginModel.phone) {
      mobileAPI = this.signinService.getUserByEmailPhone(this.loginModel.phone);
      this.phoneField = true;
      mobileAPI.pipe(takeUntil(this.destroy)).subscribe({
        next: response => {
          if (response && response.code === 200) {
            this.userDetails = response.data;
            this.showOrText = false;
            this.showPasswordField = false;
            this.showButton = false;
            this.emailField = false;
          } else if (response && response.code === 404) {
            this.handleUserNotFound();
          }
        },
        error: err => {
          this.showOrText = true;
          this.emailField = true;
          this.phoneField = true;
          this.commonService.handleError('An error occurred while fetching user details.');
        }
      });
    }

    if (!emailAPI && !mobileAPI) {
      this.commonService.handleError('Invalid request parameters.');
      return;
    }

  }

  private handleUserNotFound(): void {
    setTimeout(() => {
      this.showOrText = true;
      this.commonService.error(
        this.loginModel.email ? "User not found with Email Id" : "User not found with Mobile No."
      );
      if (this.loginModel.phone) {
        this.emailField = true;
      } else {
        this.phoneField = true;
      }
    }, 1000);

  }

  public userLogin(): void {
    const email = this.loginForm.get('email')?.value;
    const phone = this.loginForm.get('phone')?.value;
    const password = this.loginForm.get('password')?.value;
    this.loadSpinner();
    let payload;
    if (email) {
      payload = {
        email: email,
        password: password
      }

    } else {
      if (phone) {
        payload = {
          phone: phone,
          password: password
        }
      }
    }

    this.signinService.userLogin(payload).pipe(takeUntil(this.destroy)).subscribe({
      next: response => {
        if (response && response.code == 200) {
          this.isLoginSuccess = false;
          this.isMainContainer = false;
          this.successLogo = './assets/success-logo.png';
          this.commonService.success("Login Success");
        } else if (response.code == 401) {
          this.handleLoginError();
        }
      }, error: error => {
        this.commonService.handleError(error);

      }
    })
  }

  private handleLoginError(): void {
    setTimeout(() => {
      this.commonService.error(
        this.loginModel.email ? "User not found with Email Id" : "User not found with Mobile No."
      )
    }, 1000);
  }

  public nextPageSignUp(): void {

    if (!this.signUpForm.get('email')?.value) {
      return this.commonService.error("Please enter Email Id");
    }
    if (!this.signUpForm.get("mobile")?.value) {
      return this.commonService.error("Please enter Mobile No.");
    }
    if (!this.signUpForm.get("password")?.value) {
      return this.commonService.error("Please enter Password");
    }

    this.stepOne = false;
    this.isBack = false;
  }
  public previousPageSignUp(): void {
    this.stepOne = true;
    this.isBack = true;
  }

  public userSignUp(): void {
    if (!this.signUpForm.get('designation')?.value) {
      return this.commonService.error("Please Select Designation");
    }

    this.signUpModel.email = this.signUpForm.get('email')?.value;
    this.signUpModel.phone = this.signUpForm.get('mobile')?.value;
    this.signUpModel.fullName = this.signUpForm.get('name')?.value;
    this.signUpModel.password = this.signUpForm.get('password')?.value;
    this.signUpModel.organizationName = this.signUpForm.get('orgname')?.value;
    this.signUpModel.organizationId = this.signUpForm.get('orgId')?.value;
    this.signUpModel.pincode = this.signUpForm.get('pincode')?.value;
    this.signUpModel.designation = this.signUpForm.get('designation')?.value.join(",");
    this.signUpModel.birthDate = new Date(this.signUpForm.get('date')?.value).getTime();
    this.signUpModel.city = this.signUpForm.get('city')?.value;

    this.loadSpinner();
    this.signinService.userSignUp(this.signUpModel).pipe(takeUntil(this.destroy)).subscribe({
      next: response => {
        if (response && response.code == 201) {
          this.isSignUpSuccess = false;
          this.isSignUpform = true;
          this.successLogo = './assets/success-logo.png';
          this.isBack = false;
          this.commonService.success("User SignUp Successful");
        } else if (response && response.code == 409) {
          this.commonService.error("User already exists with EMail/Mobile No.");
        } else {
          this.commonService.error("Failed to create new User");
        }
      }, error: error => {
        this.commonService.handleError(error);
      }
    })

  }



  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
