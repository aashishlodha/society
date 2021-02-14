export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public flatNo: number,
    public wing: string,
    public contactNo: number,
    public isResident: boolean = true,
    // public isOwner: boolean = false,
    public isGuest: boolean = false,
    public society: string = "Shreeram Paradise"
  ){}

  /*toString() {
    return '{' +
      '"firstName":' + this.firstName + ','
      '"firstName":' + this.firstName + ','
  }*/
}
