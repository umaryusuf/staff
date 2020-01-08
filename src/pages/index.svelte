<script>
  import { URL, handleError, checkAuth } from '../constants.js';
  import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications';
  import { user } from '../stores.js';

  let username = '';
  let password = '';
  // persist user data
  user.useLocalStorage();

  function handleLogin(e) {

    if(username.trim() !== "" && password.trim !== "") {
      const data = {
        "username": username,
        "password": password
      };

      fetch(`${URL}/auth/signin`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => {
        console.log('user', data);
        if(data.status === "success") {
          // set user data
          user.set(data.user.data);
          // set token
          localStorage.setItem('auth-token', data.token);
          // display notification message
          notifier.success(data.message);
          // redirect to dashboard
          history.pushState({}, null, '/dashboard')
        } else {
          handleError(data.message);
        }
      })
      .catch(error => console.log(error));

    } else {
      notifier.danger('Username and password are empty');
    }
  }
</script>

<style>
  .wrapper {
    background-color: #1C2839;
    width: 100vw;
    height: 100vh;
  }

  form {
    background-color: white;
    padding: 40px;
    border-radius: 5px;
  }
  
  .btn-sec {
    background-color: #1B2739;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    padding: 10px 0;
  }
</style>

<NotificationDisplay />

<main class="wrapper">
  <div class="card-login">
    <div class="row">
      <div class="col-md-4 offset-md-4">
        <form class="mt-5" on:submit|preventDefault={handleLogin}>
          <h2 class="text-center mb-4">[ Staff Login ]</h2>
          <div class="form-group">
            <label for="username">Username:</label>
            <input 
              type="text" 
              id="username" 
              bind:value={username} 
              class="form-control" 
              placeholder="username"
            >
          </div>
          <div class="form-group">
            <label for="password">Paswword:</label>
            <input 
              type="password" 
              id="password" 
              bind:value={password} 
              class="form-control" 
              placeholder="password"
            >
          </div>
          <button type="submit" class="btn btn-sec btn-block btn-bg">Sign In</button>
        </form>
      </div>
    </div>
  </div>
</main>
