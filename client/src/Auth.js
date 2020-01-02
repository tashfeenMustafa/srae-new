const Auth = {
    isAuthenticated: false,
    authenticate() {
      this.isAuthenticated = true;
    },
    signOut() {
      this.isAuthenticated = false;
    }
}

export default Auth;