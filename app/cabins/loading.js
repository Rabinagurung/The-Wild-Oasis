import Spinner from "../_components/Spinner";

export default function Loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p>Loading cabin data.....</p>
    </div>
  );
}
