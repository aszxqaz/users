import { Transform } from 'class-transformer';

export default function TransformDate() {
    const toPlain = Transform(({ value }) => (value as Date).toISOString(), {
        toPlainOnly: true,
    });
    const toClass = Transform(({ value }) => new Date(value as string), {
        toClassOnly: true,
    });
    return function (target: any, key: string) {
        toPlain(target, key);
        toClass(target, key);
    };
}
