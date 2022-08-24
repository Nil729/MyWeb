import { FormRoutin } from "./form_routin";

export function ViewRoutin({routin}){

    const statusTrue = routin.filter((todo) => todo.selected);
    return (
        <> 
            {statusTrue.map((stat) =>(
                <FormRoutin key= {stat.id} data_task= {stat} />
            ))}

        </>
    );
}