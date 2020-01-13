import { notifier } from "@beyonk/svelte-notifications";

export const URL = 'http://localhost/schoolmoapi';

export const handleError = message => {
  notifier.danger(message);

  if(message.toLowerCase() === "token has expired" 
    || message.toLowerCase() === "token is empty") {
    // redirect to login page
    history.pushState({}, null, '/');
    localStorage.clear();
  }

}

export const checkAuth = () => {
  const token = localStorage.getItem('token');

  if(!token) {
    // redirect to login page
    history.pushState({}, null, '/')
  }
}

export const logout = () => {
  history.pushState({}, null, '/');
  localStorage.clear();
}