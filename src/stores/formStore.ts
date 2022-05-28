import { defineStore } from "pinia";

type FormSubmissions={
    id:number;
    status:'pending'|'processed';
}

type BankDetails={
    formId:number
    transactions:FormSubmissions[];
    email:string,
    password:string,
}
export const useFormStore=defineStore('bankAccount',{
    state:()=>{
        return{
            formId: 0,
            transactions: [],
            email: [],
            password: [],
        } as unknown as  BankDetails;
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
       
    }
})

