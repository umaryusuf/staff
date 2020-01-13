<script>
  import { createEventDispatcher } from 'svelte';
  import { notifier } from "@beyonk/svelte-notifications";
  import { URL, handleError } from '../../../../helpers';
  import { queries } from '../../../../stores';

  const dispatch = createEventDispatcher();

  export let modalActive, description, schoolId, staffId;

  function handleQuery() {
    if(!description) {
      notifier.warning("description is required");
      return;
    }

    const url = `${URL}/staff/query/${schoolId}`;

    const data = {
      description: description,
      staff_id: staffId,
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
      queries.update(item => {
        return [...resData.data, ...item]
      });
      // close the modal
      dispatch('close-modal', 'queries');
    })
    .catch(error => console.log(error));

  }

</script>

<div class="modal {(modalActive === 'query') ? "fade show": ""}" 
  id="modal1" tabindex="-1" role="dialog" 
  aria-labelledby="enableeditmodal" 
  style="display: { (modalActive === 'query') ? "block": "none"};" 
  aria-modal="true"
>
  <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
    <div class="modal-content tx-14">
      <div class="modal-header bg-darker ">
        <h6>Add Query</h6>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span class="close-modal" on:click={() => dispatch('close-modal', 'queries')} aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <form on:submit|preventDefault={handleQuery}>
          <div class="form-group">
            <label for="description">Description: </label>
            <textarea 
              class="form-control" 
              name="description" 
              bind:value={description} 
              id="description" 
              rows="3"></textarea>
          </div>
          <button class="btn btn-sec btn-block">Submit</button>
        </form>
      </div>
    </div>
  </div>
</div>