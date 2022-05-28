import { defineStore } from "pinia";

type FormSubmissions={
    id:number;
    status:'pending'|'processed';
}

type formDetails={
    formId:number
    formSubmission:FormSubmissions[];
    email:string,
    password:string,
    confirm:string,
}
export const useFormStore=defineStore('bankAccount',{
    state:()=>{
        return{
            formId: 0,
            transactions: [],
            email: '',
            password: '',
            confirm:'',
        } as unknown as  formDetails;
    },
    getters:{
       emailShowCaser():string{
           return this.email;
       },
       passWordShowCaser():string{
        return this.password
       }
    },
    actions:{
       emailChange(email:string){
           return this.email=email
       }
    }
})

