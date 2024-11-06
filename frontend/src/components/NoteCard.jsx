import React from "react";
import { FaTags } from "react-icons/fa6";
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";
import moment from "moment";

const NoteCard = ({
  title,
  date,
  content,
  tags = [],
  isPinned,
  onPinNote,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="border rounded-lg p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      {/* Header with Title and Pin */}
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium text-gray-800">{title}</h6>
          <span className="text-xs text-green-700">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>
        <MdOutlinePushPin
          className={`text-xl cursor-pointer ${
            isPinned ? "text-blue-500" : "text-slate-300"
          }`}
          onClick={onPinNote}
        />
      </div>

      {/* Content Preview */}
      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
        {content?.slice(0, 60)}{content?.length > 60 ? "..." : ""}
      </p>

      {/* Tags and Actions */}
      <div className="flex items-center justify-between mt-4">
        {/* Tags Section */}
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <FaTags className="text-slate-400 mr-1" />
          {tags.length > 0 ? tags.map((item, index) => (
            <span key={index} className="bg-gray-200 px-2 py-0.5 rounded">
              #{item}
            </span>
          )) : <span className="text-gray-400">No tags</span>}
        </div>

        {/* Edit and Delete Icons */}
        <div className="flex items-center gap-2">
          <MdCreate
            className="text-slate-400 hover:text-green-600 cursor-pointer"
            onClick={onEdit}
          />
          <MdDelete
            className="text-slate-400 hover:text-red-500 cursor-pointer"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
