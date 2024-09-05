export function isBoolean(value : any) : boolean{
    return typeof value === 'boolean';
}

/**
 * boolean 또는 null 또는 undefind 인지
 */
export function isBooleanOrNone(value : any) : boolean{
    return typeof value === 'boolean' || value == null;
}

export function isString(value : any) : boolean{
    return typeof value === 'string';
}

/**
 * string 또는 null 또는 undefind 인지
 */
export function isStringOrNone(value : any) : boolean{
    return typeof value === 'string' || value == null;
}
    

export function isNumber(value : any) : boolean{
    return typeof value === 'number';
}


