import ShowAttachment from "./show.js";
import EditAttachment from "./edit.js";
import ListAttachment from "./list.js";
import FilterAttachment from "./filter.js";
import type { BasePropertyProps } from "adminjs";

function AttachmentComponent(props: BasePropertyProps) {
  switch (props.where) {
    case "edit":
      return <EditAttachment {...props} />;
    case "filter":
      return <FilterAttachment {...props} />;
    case "list":
      return <ListAttachment {...props} />;
    case "show":
    default:
      return <ShowAttachment {...props} />;
  }
}

export default AttachmentComponent;
