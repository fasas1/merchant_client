export default interface apiResponse{
    data?:{
        stausCode?: number;
        isSuccess?: boolean;
        errorMessages?: Array<string>
        result:{
            [key:string] : string;
        }
    }
    error?: any;
}