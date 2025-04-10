import createElement from "../lib/createElement";

function Progress({ total, completed }) {
  const percent = Math.round((completed / total) * 100);

  return (
    <div class="progress-bar-container">
      <div class="progress-bar" style={`width: ${percent}%`}></div>
    </div>
  );
}

export default Progress;
