<script>
  import Navleft from './_navleft.svelte';
  import { notifier } from '@beyonk/svelte-notifications';
  import { URL, handleError } from '../../../constants.js';
  import { singleStaff, user } from '../../../stores.js';

  let userData = {};

  user.useLocalStorage();
  
  user.subscribe(data => {
    userData = data;
  });

  function handleChange(e) {
    fetch(`${URL}/staff/${userData.school_info.id}/${e.detail}`, {
      headers: {
        'Authorization': localStorage.getItem('auth-token')
      }
    })
    .then(res => res.json())
    .then(data => {

      if(data.status === 'success') {
        singleStaff.set(...data.data);
        notifier.success(data.message);
      } else {
        singleStaff.set([]);
        handleError(data.message);
      }
      localStorage.setItem('auth-token', data.token)
    })
    .catch(error => console.log(error));
  }

</script>

<section class="content-body" style="padding-left: 0;">
  <div class="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-25 mg-xl-b-30">
     
    <div class="d-none d-md-block">
      <a href="/dashboard/new-staff" class="btn btn-sm pd-x-15 btn-sec btn-uppercase mg-l-5">
        <i data-feather="file" class="wd-10 mg-r-5"></i> 
        Create New Staff
      </a>
    </div>
  </div>
  <div class="contact-wrapper contact-wrapper-two">
    <Navleft on:route-changed={handleChange}/>
    <!-- slot to insert dynamic content -->
    <slot />

  </div>
</section>
