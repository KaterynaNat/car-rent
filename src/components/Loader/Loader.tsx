import { type JSX } from "react";
import { PuffLoader } from "react-spinners";
import css from "./Loader.module.css";

interface LoaderProps {
  loading: boolean;
}

const Loader = ({ loading }: LoaderProps): JSX.Element | null => {
  if (!loading) return null;

  return (
    <div className={css.container}>
      <PuffLoader loading={loading} color="#3470ff" />
    </div>
  );
};

export default Loader;
