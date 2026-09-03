import { useState } from "react"
import { KeyRound } from "lucide-react"
import toast from "react-hot-toast"
import { changePassword } from "../../services/changePassword.service"

export default function Setting() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  async function handleUpdatePassword() {
    // simple checks
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all the fields.")
      return
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.")
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password don't match.")
      return
    }

    setIsSaving(true)
    try {
      const formData = new FormData()
      formData.append("password", currentPassword)
      formData.append("newPassword", newPassword)

      const { data } = await changePassword(formData)

      // the api gives back a fresh token, save it so we stay logged in
      if (data.token) localStorage.setItem("userToken", data.token)

      toast.success("Password updated!")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main className="min-h-screen py-6 sm:py-8 px-4 sm:px-5">
      <div className="max-w-xl mx-auto">
        <p className="kicker text-ink-faint mb-4">Settings</p>

        <div className="bg-surface border border-line rounded-card p-4 sm:p-6">

          {/* header */}
          <div className="flex items-start gap-3 border-b border-line pb-4">
            <span className="border border-line text-ink rounded-xs w-10 h-10 flex items-center justify-center shrink-0">
              <KeyRound size={17} />
            </span>
            <div>
              <h1 className="font-display text-xl text-ink">Change password</h1>
              <p className="text-sm text-ink-faint mt-0.5">
                Keep your account secure by using a strong password.
              </p>
            </div>
          </div>

          {/* form */}
          <div className="mt-5 flex flex-col gap-5">

            {/* current password */}
            <div className="flex flex-col gap-2">
              <label className="kicker text-ink-faint">Current password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full bg-transparent border-b border-line focus:border-ink py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none transition-colors"
              />
            </div>

            {/* new password */}
            <div className="flex flex-col gap-2">
              <label className="kicker text-ink-faint">New password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full bg-transparent border-b border-line focus:border-ink py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none transition-colors"
              />
              <p className="text-xs text-ink-faint">
                At least 8 characters with uppercase, lowercase, number, and special character.
              </p>
            </div>

            {/* confirm new password */}
            <div className="flex flex-col gap-2">
              <label className="kicker text-ink-faint">Confirm new password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full bg-transparent border-b border-line focus:border-ink py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none transition-colors"
              />
            </div>

            {/* submit */}
            <button
              type="button"
              onClick={handleUpdatePassword}
              disabled={isSaving}
              className="w-full bg-ink hover:bg-ink/90 disabled:opacity-40 disabled:cursor-not-allowed text-paper text-sm font-medium py-3 rounded-xs cursor-pointer transition-colors mt-1"
            >
              {isSaving ? "Updating…" : "Update password"}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
