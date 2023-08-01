import type { ATBFError } from '@/models/ATBFError';

export default {
    ErrorKeys: {
        DefaultKey: "message" 
    },

    GetErrors(domErrors:ATBFError[], errors:any, throwError:boolean = true) {
        try {
            errors = errors.response.data.errors

            domErrors.forEach(x => {
                x.errors = []
                try {
                    let currentErrors = errors[x.name]

                    if (currentErrors != undefined) {
                        x.errors.push(errors[x.name])
                    }
                }
                catch {}
            })
        } catch (error) {
            throw errors
        }

        if (throwError){
            if (errors['message'] === "User session invalid") {
                throw new Error(errors['message'])
            }
    
            if (errors['message'] != undefined) {
                throw new Error(errors['message'])
            }
        }
    }
}