import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:"filter",
    standalone:true
})

export class FilterPipes implements PipeTransform{
    transform(value: any, ...args: any[]) {
        
    }

}