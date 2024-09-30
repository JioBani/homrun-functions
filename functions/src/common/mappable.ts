export abstract class Mappable {
    toMap(): { [key: string]: any } {

        const map: { [key: string]: any } = {};

        Object.entries(this).forEach(([key, value]) => {
            if (value instanceof Mappable) {
                map[key] = value.toMap();
            }
            else if (Array.isArray(value)) {
                map[key] = value.map(e => {
                    if (e instanceof Mappable) {
                        return e.toMap();
                    } else if (typeof e === 'object' && e !== null) {
                        return Object.assign({}, e); // 객체인 경우 복사
                    } else {
                        return e; // 원시 타입인 경우 그대로 반환
                    }
                });
            } else if (typeof value === 'object' && value !== null) {
                map[key] = Object.assign({}, value); // 객체인 경우 복사
            } else {
                map[key] = value; // 원시 타입인 경우 그대로 반환
            }
        });
        return map;
    }
}
