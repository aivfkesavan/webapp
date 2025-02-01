import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { confirmDeleteAccount, forgetPass, login, logout, resendOtp, resetPass, signup, updatePass, verifyOtp } from "../actions/user";

import useAuthStore from "../store/auth";

import { useToast } from "@/hooks/use-toast";

export function useSignupMutate() {
  const navigate = useNavigate()

  const { toast } = useToast()

  return useMutation({
    mutationFn: signup,
    onSuccess() {
      toast({ title: "Account created successfully" })
      navigate("/login")
    },
    onError(error) {
      let hasError = error?.message
      toast({ title: hasError || "An error occurred. Please try again." })
    }
  })
}

export function useSendOTP() {
  const { toast } = useToast()

  return useMutation({
    mutationFn: resendOtp,
    onSuccess() {
      toast({ title: "OTP has been sent successfully. Please check your email." })
    },
    onError(error) {
      let hasError = error?.message
      toast({ title: hasError || "An error occurred. Please try again." })
    }
  })
}

export function useVerifyEmail() {
  const updateAuth = useAuthStore(s => s.update)

  const { toast } = useToast()

  return useMutation({
    mutationFn: verifyOtp,
    onSuccess() {
      updateAuth({ isVerified: true })
      toast({ title: "Account verified successfully" })
    },
    onError(error) {
      let hasError = error?.message
      toast({ title: hasError || "An error occurred. Please try again." })
    }
  })
}

export function useLoginMutate() {
  const updateAuth = useAuthStore(s => s.update)
  const navigate = useNavigate()

  const { toast } = useToast()

  function onLoginSuccess(data: any) {
    updateAuth({
      ...data,
      isLoggedIn: true,
    })

    const to = ""
    navigate(to, { replace: true })
    toast({ title: "Successfully logged in." })
  }

  return useMutation({
    mutationFn: login,
    onSuccess(res, variables) {
      onLoginSuccess({
        ...res,
        email: variables?.email,
      })
    },
    onError(err) {
      let hasError = err?.message
      if (hasError === "Network Error") {
        // offlineLogin(variables)
        toast({ title: "Unable to log in. Please check your network connection." })
      }
      else {
        toast({ title: hasError || "An error occurred. Please try again." })
      }
    }
  })
}

export function useUpdatePassMutate() {
  const { toast } = useToast()

  return useMutation({
    mutationFn: updatePass,
    onSuccess() {
      toast({ title: "Password updated successfully" })
    },
    onError(err) {
      let hasError = err?.message
      toast({ title: hasError || "An error occurred. Please try again." })
    }
  })
}

export function useFogetPassMutate() {
  const { toast } = useToast()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: forgetPass,
    onSuccess() {
      navigate("/reset-pass")
      toast({ title: "Check your email to retrieve the OTP." })
    },
    onError(err) {
      let hasError = err?.message
      toast({ title: hasError || "An error occurred. Please try again." })
    }
  })
}

export function useResetPassMutate() {
  const { toast } = useToast()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: resetPass,
    onSuccess() {
      navigate("/login")
      toast({ title: "Password updated successfully" })
    },
    onError(err) {
      let hasError = err?.message
      toast({ title: hasError || "An error occurred. Please try again." })
    }
  })
}

export function useLogoutMutate() {
  const clearAuth = useAuthStore(s => s.clear)
  const { toast } = useToast()

  return useMutation({
    mutationFn: logout,
    onSuccess() {
      clearAuth()
      toast({ title: "Successfully logged out." })
    },
    onError(err) {
      console.log(err)
      if (err?.message === "Network Error") {
        toast({ title: "Please check your network connection to log out." })
      } else {
        toast({ title: err?.message || "An error occurred. Please try again." })
      }
    }
  })
}

export function useAccountDeleteConfirmMutate() {
  const { toast } = useToast()

  return useMutation({
    mutationFn: confirmDeleteAccount,
    onSuccess() {
    },
    onError(err) {
      let hasError = err?.message
      toast({ title: hasError || "An error occurred. Please try again." })
    }
  })
}
