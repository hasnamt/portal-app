import { Component, OnInit ,Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OAuthService, JwksValidationHandler,AuthConfig } from 'angular-oauth2-oidc';


@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html'
})
@Injectable({ providedIn: 'any' })
export class PortalComponent implements OnInit {
  posts = [];
  cities=[];
  private postsUrl = 'http://localhost:8080/v1/submissions';

  private weatherapiUrl = "http://api.openweathermap.org/data/2.5/group?appid={YOUR_API_KEY_HERE}&id=";

  public authConfig: AuthConfig = {
    issuer: 'https://accounts.google.com',
    redirectUri: window.location.origin + '/index.html',
    clientId: "{YOUR_CLIENT_ID_HERE}",
    scope: 'openid profile email',
    strictDiscoveryDocumentValidation: false
  };

  public error: string;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
  'Authorization': "Bearer"})
  };

  constructor(
   private http: HttpClient,
     private oauthService: OAuthService
    ) { }

  ngOnInit(): void {
    //initialize google oauth
    this.initGoogleAuth();
    this.getPosts();

    //Call weather API group with given cities as query param
    this.http.get(this.weatherapiUrl+this.cities.join(",")).subscribe(data => {
      console.log(data["list"]["weather"]["main"]["temp"]);
      //loop through the given posts and update 
      //the temperature with weather reponse 
      this.posts.forEach(element => {
        element.temprature=data["list"].filter(x=>x.city_name===element.city)[0]["weather"]["main"]["temp"]
      });


    });
  }


  addPost(newPost: string) {
    console.log("adding post ")

    //authenticate user if user already not authenticated or acccesstoken in the cookie expired
    //using oauth2 authorization code flow and get the access token and store in cookies
    if (!this.checkIfUserAuthenticatedAndvalidAccessTokenInCookies()) {
      this.authenticate();
    }

    if (newPost) {
      let location = this.getLocation();
      let post={
        value: newPost,
        city:location["city"],
        location:{
          type: "point",
          coordinates:[location["latitude"],location["longitude"]]
        }

      }

      return this.http.post(this.postsUrl, post, this.httpOptions).subscribe(
        (val) => {
            console.log("POST call successful value returned in body", 
                        val);
             this.posts.push(val["data"]["submission"])
        },
        response => {
            console.log("POST call in error", response);
        },
        () => {
            console.log("The POST observable is now completed.");
        });
    }
  }

    // Read all Submission Items
    getPosts(): void {
    this.submissionsServiceGetSubmissions()
      .subscribe(
        posts => {
           posts["data"]["submissions"].forEach(element => {
            this.posts.push(element)
            this.cities.push(element.city);
          });
          
        }
      )
  }
  // Submission Items Service: Read all Submission Items
  submissionsServiceGetSubmissions() {
    return this.http
      .get<any[]>(this.postsUrl+"page_offset=0&page_size=20")
      .pipe(map(data => data))
  }


    //Initial google Auth
  async initGoogleAuth(): Promise<void> {
    this.oauthService.configure(this.authConfig),
    this.oauthService.tokenValidationHandler = new JwksValidationHandler(),
    this.oauthService.loadDiscoveryDocumentAndTryLogin()
  }

//outh2 authorization code flow initialization
//get the accesstoken and store in the cookies and send the accesstoken as Bearer token 
// to call submissions service POST APIs
  async authenticate(){
    return new Promise(async () => { 
      //this.oauthService.initCodeFlow();
    });
  }


  //check if user already authenticated and have a valid accesstoken in the cookies
  async checkIfUserAuthenticatedAndvalidAccessTokenInCookies(){

  }

// get location details whenever someone add a new post
getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        let city= this.callAddressApi(longitude, latitude);

        let location={"city":city,"latitude":latitude,"longitude":longitude}
        console.log("location ",location)
      

      });
      return  location;
  } else {
     console.log("No support for geolocation")
  }
}

callAddressApi(Longitude: number, Latitude: number){
  const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${Longitude}&lat=${Latitude}`
  //Call API and return City
}


addReply(idpost: string,reply:string) {

  let replyPostUrl=this.postsUrl+"/"+idpost+"/replies";
  return this.http.post(replyPostUrl, {"message":reply}, this.httpOptions).subscribe(
    (val) => {
        console.log("POST call successful value returned in body", 
                    val);
         this.posts.push(val["data"]["reply"])
    },
    response => {
        console.log("POST call in error", response);
    },
    () => {
        console.log("The POST observable is now completed.");
    });

}


}



