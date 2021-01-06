import React from "react";
import { List } from "antd";

const Comment = ({ loadCommentResult }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={loadCommentResult}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta title={item.User.name} description={item.content} />
        </List.Item>
      )}
    />
  );
};

export default Comment;
