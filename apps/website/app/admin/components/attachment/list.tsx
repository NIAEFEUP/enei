import type { BasePropertyProps } from "adminjs";

function ListAttachment(props: BasePropertyProps) {
    const property = props.property;
    const value = props.record?.params[property.path];

    return value?.originalName;
}

export default ListAttachment;
