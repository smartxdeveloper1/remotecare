import { Type } from '@angular/core';

export class AddRegistration {
    userName:{type:String};
    imei:{type:String,reqired:true};
    registrationId:{type:string,required:true};
    deviceId:{type:string,required:true};
    successNotificationCount:{type:string,required:true};
}
