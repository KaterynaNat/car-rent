import type { FC } from "react";

interface ToastFormNotificationProps {
  title: string;
  data: Record<string, string | number | null | undefined>;
}

export const ToastFormNotification: FC<ToastFormNotificationProps> = ({
  title,
  data,
}) => {
  return (
    <div>
      <h4 style={{ marginTop: 0, marginBottom: "10px" }}>{title}</h4>
      <ul style={{ padding: "0 0 0 20px", margin: 0 }}>
        {Object.entries(data).map(([key, value]) => (
          <li key={key} style={{ marginBottom: "5px" }}>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
            {value != null && value !== "" ? value : "-"}
          </li>
        ))}
      </ul>
    </div>
  );
};
