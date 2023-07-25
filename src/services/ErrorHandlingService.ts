import type { ATBFError } from '@/models/ATBFError';


export default {
    ErrorKeys: {
        DefaultKey: "message" 
    },

    GetErrors(domErrors:ATBFError[], errors:any) {
        if (typeof(errors) == typeof(new Error)) {
            console.log("THROWING ERROR")
            throw errors
        }

        errors = errors.response.data.errors

        if (errors['message'] === "User session invalid") {
            console.log("ERROR INVALID SESSION")
            throw new Error("User session invalid")
        }

        if (errors['message'] != undefined) {
            console.log("ERROR")
            throw new Error(errors['message'])
        }

        domErrors.forEach(x => {
            x.errors = []
            try {
                let currentErrors = errors[x.name]

                if (currentErrors != undefined) {
                    x.errors = errors[x.name]
                }
            }
            catch {}
        })
    }
}