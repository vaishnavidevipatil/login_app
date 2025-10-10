import { useState } from "react";

function Forgotpw() {
  const [step, setStep] = useState("forgot"); // step: "forgot" or "confirm"
  const [email, setEmail] = useState("");     // keep email across steps

  return (
    <div className="flex flex-col items-center p-6">
      {step === "forgot" && (
        <ForgotPasswordForm email={email} setEmail={setEmail} onNext={() => setStep("confirm")} />
      )}
      {step === "confirm" && <ConfirmPasswordReset email={email} />}
    </div>
  );
}

// Step 1: Enter email
function ForgotPasswordForm({ email, setEmail, onNext }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email");
      return;
    }
    // 👉 Normally you’d call backend API to validate email exists
    console.log("Email entered:", email);
    onNext(); // move to password reset step
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-72">
      <h2 className="text-xl font-bold">Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <button type="submit" className="bg-blue-600 text-white py-2 rounded">
        Next
      </button>
    </form>
  );
}

// Step 2: Enter new password
function ConfirmPasswordReset({ email }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    // 👉 Call backend API to reset password
    const response = await fetch("http://localhost:5000/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword: password }),
    });

    const data = await response.json();
    if (data.success) {
      alert("Password reset successful! Please login again.");
      window.location.href = "/login"; // redirect to login
    } else {
      alert("Password reset failed. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-72">
      <h2 className="text-xl font-bold">Reset Password</h2>
      <p className="text-sm text-gray-600">For account: {email}</p>

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
        size={30}
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        className="border p-2 rounded"
        size={30}
        required
      />
      <button type="submit" className="bg-green-600 text-white py-2 rounded">
        Reset Password
      </button>
    </form>
  );
}

export default Forgotpw;
