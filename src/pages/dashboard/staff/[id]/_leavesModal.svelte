<script>
  import { createEventDispatcher } from 'svelte';
  import { notifier } from "@beyonk/svelte-notifications";
  import { URL, handleError } from '../../../../helpers';
  import { leaves } from '../../../../stores';

  export let modalActive, schoolId, staffId;

  const dispatch = createEventDispatcher();

  let description, start_date, end_date;

  function handleLeave() {

    if(!description || !start_date || !end_date) {
      notifier.warning("description, start & end date required");
      return;
    }

    const url = `${URL}/leave/${schoolId}`;

    const data = {
      description: description,
      staff_id: staffId,
      start_date: start_date,
      end_date: end_date
    };

    fetch(url, {
      method: 'POST',
      headers: {
        authorization: localStorage.getItem('auth-token')
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(resData => {
      // show success message
      notifier.success(resData.message);
      // update the store
      leaves.update(item => {
        return [resData.data, ...item]
      });
      // close the modal
      dispatch('close-modal', 'leave');
    })
    .catch(error => console.log(error));

  }

</script>

<div class="modal {(modalActive === 'leave') ? "fade show": ""}" 
  id="modal1" tabindex="-1" role="dialog" 
  aria-labelledby="enableeditmodal" 
  style="display: { (modalActive === 'leave') ? "block": "none"};" 
  aria-modal="true"
>
  <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
    <div class="modal-content tx-14">
      <div class="modal-header bg-darker ">
        <h6>Request Leave</h6>
        <button type="button" class="close" 
          data-dismiss="modal" 
          aria-label="Close"
        >
          <span class="close-modal" 
          on:click={() => dispatch('close-modal', 'leave')} 
          aria-hidden="true"
        >×</span>
        </button>
      </div>
      <div class="modal-body">
        <form on:submit|preventDefault={handleLeave}>
          <div class="form-group">
            <label for="description">Description: </label>
            <textarea 
              class="form-control" 
              name="description" 
              bind:value={description} 
              id="description" 
              rows="3"></textarea>
          </div>
          <div class="form-group">
            <label for="start_date">Start Date: </label>
            <input class="form-control" type="date" bind:value={start_date} id="start_date">
          </div>
          <div class="form-group">
            <label for="end_date">End Date: </label>
            <input class="form-control" type="date" bind:value={end_date} id="end_date">
          </div>
          <button class="btn btn-sm btn-sec btn-block">Submit</button>
        </form>
      </div>
    </div>
  </div>
</div>