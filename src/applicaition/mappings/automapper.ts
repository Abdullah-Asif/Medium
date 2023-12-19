class Mapper {
    public map<TSource, TDestination extends object>(sourceObj: TSource, destinationClass: new () => TDestination): TDestination {
        const destinationObj = new destinationClass();
        for (const key in sourceObj) {
            if (Object.prototype.hasOwnProperty.call(sourceObj, key)) {
                if (key in destinationObj) {
                    (destinationObj as any)[key] = (sourceObj as any)[key];
                }
            }
        }
        return destinationObj;
    }
}
export default new Mapper();


