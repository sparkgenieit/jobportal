export const validateAdForm = (form) => {

    if (!form) return [false, "Please fill all the fields"];

    if (!form.title?.trim()) return [false, "Please provide the title"];

    if (!form.description?.trim()) return [false, "Please provide the description"];
   

   // if (!form.location?.trim()) return [false, "Please provide the location"];

    if (!form.redirect_url?.trim()) return [false, "Please provide the trace link"];

    return [true, null];
};

export const getValue = (path) => path.split("/").at(-1) // get the value with the path