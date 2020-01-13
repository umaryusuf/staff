<script>
  import { createEventDispatcher } from 'svelte';
  import { notifier } from "@beyonk/svelte-notifications";
  import { URL, handleError } from '../../../../helpers';
  import { transferStores } from '../../../../stores';

  export let modalActive, schools, schoolName, schoolId, staffId;

  const dispatch = createEventDispatcher();

  let selected, date;

  function handleTransfer(e) {
    if(!selected || !date) {
      notifier.warning("destination school & date required");
      return;
    }

    const url = `${URL}/transfer/${schoolId}`;

    const data = {
      staff_id: staffId,
      originating_school: schoolName,
      destination_school: selected,
      time: date
    }

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
      transferStores.update(item => {
        return [...resData.data, ...item]
      });
      // close the modal
      dispatch('close-modal', 'transfer');
    })
    .catch(error => console.log(error));
  }

</script>

<div class="modal {(modalActive === 'transfer') ? "fade show": ""}" 
  id="modal1" tabindex="-1" role="dialog" 
  aria-labelledby="enableeditmodal" 
  style="display: { (modalActive === 'transfer') ? "block": "none"};" 
  aria-modal="true"
>
  <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
    <div class="modal-content tx-14">
      <div class="modal-header bg-darker ">
        <h6>Transfer Staff</h6>
        <button type="button" class="close" 
          data-dismiss="modal" 
          aria-label="Close"
        >
          <span class="close-modal" 
          on:click={() => dispatch('close-modal', 'transfer')} 
          aria-hidden="true"
        >×</span>
        </button>
      </div>
      <div class="modal-body">
        <form on:submit|preventDefault={handleTransfer}>
         <div class="form-group">
            <label for="originating_school">Originating School: </label>
            <input 
              class="form-control" 
              type="originating_school" 
              value={schoolName} 
              disabled
              id="originating_school"
              >
          </div>
          <div class="form-group">
            <label for="transfer_to">Destination School: </label>
            <select class="form-control" bind:value={selected} id="transfer_to">
              <option value="">-- select ---</option>
              {#each schools as school}
              <option value="{school.schoolname.trim()}">{school.schoolname}</option>
              {/each}
            </select>
          </div>
          <div class="form-group">
            <label for="date">Date: </label>
            <input class="form-control" type="date" bind:value={date} id="date">
          </div>
          <button type="submit" class="btn btn-sm btn-block btn-sec">Transfer Staff</button>
        </form>
      </div>
    </div>
  </div>
</div>