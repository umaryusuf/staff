<script>
import { URL } from '../../../helpers';
import { staffStore, user } from '../../../stores';
import { notifier } from '@beyonk/svelte-notifications';

let userData = {};

user.useLocalStorage();

user.subscribe(data => {
  userData = data;
});

let staffData = {};
let fullname,
    phone,
    email,
    sex,
    marital_status,
    dateofentry,
    birthdate,
    qualification,
    designation,
    discipline,
    staff_type,
    years_of_experience,
    employment_type,
    contract_type,
    contract_duration,
    gross_salary,
    res_allowance,
    church_membership,
    wofbi_level,
    disciplinary_cases,
    cert_ver_status,
    address;

const handleCreateStaff = () => {
  // handle form validation here
  // if(!name || phone || !email) {
  //   notifier.warning("name, phone & date required");
  //   return;
  // }

  const url = `${URL}/staff/${userData.school_info.id}`;

  const data = {
    fullname, phone, email, sex, marital_status, dateofentry, qualification,
    designation, discipline, staff_type, years_of_experience: years_of_experience + " year(s)", employment_type, contract_type,
    contract_duration, gross_salary, responsibility_allowances: res_allowance, address,
    cert_ver_status, wofbi_level, church_membership
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
    // redirect to modal
    history.pushState({}, null, '/dashboard/staff');
  })
  .catch(error => console.log(error));

  // console.log(data);

}

</script>

<style>
#contactInformation {
  background: white; 
  padding: 25px;
  border-radius: 5px;
  border: 1px solid #17212F;
}
</style>

<section class="content-body">
  <form 
    id="contactInformation" 
    on:submit|preventDefault={handleCreateStaff}>
            
    <div class="d-flex align-items-center justify-content-between mg-b-10">
      <h6 class="mg-b-0">Create New Staff</h6>
      <div class="d-flex">
        <button type="submit" class="btn btn-sec">Add New Staff</button>
      </div>
    </div>

    <div class="row">
      <div class="col-4 col-sm-4">
        <label
          for="fullname"
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Full Name
        </label>
        <input 
          type="text" 
          name="fullname" 
          bind:value={fullname} 
          class="form-control form-control-sm" 
          id="fullname" 
          required>
      </div>
      <!-- col -->
      <div class="col-6 col-sm-4">
        <label
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Phone
        </label>
        <input 
          type="tel" 
          bind:value={phone}
          name="phone" 
          class="form-control" 
          id="phone" 
          required>
      </div>
       <!-- col -->
      <div class="col-6 col-sm-4">
        <label
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Email
        </label>
        <input 
          type="email" 
          name="email" 
          bind:value={email} 
          class="form-control" 
          id="email" 
          required>
      </div>
      <!-- col -->
    </div>
    <!-- row -->

    <div class="row mt-2">
      <div class="col-4 col-sm">
        <label
          for="sex"
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Sex
        </label>
        <select name="sex" class="form-control" bind:value={sex} id="sex" required>
          <option selected>-- select --</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
       <!-- col -->
      <div class="col-4 col-sm">
        <label
          for="marital_status"
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Marital Status
        </label>
        <select 
          name="marital_status" 
          bind:value={marital_status} 
          class="form-control" 
          id="marital_status">
          <option selected>-- select --</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
        </select>
      </div>
      <!-- col -->
      <div class="col-4 col-sm">
        <label
          for="dateofentry"
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Date Of Entry
        </label>
        <input 
          type="date" 
          name="dateofentry" 
          bind:value={dateofentry} 
          class="form-control" 
          id="dateofentry" 
          required>
      </div>
      <!-- col -->
      <div class="col-sm mg-t-20 mg-sm-t-0">
        <label
          for="birthdate"
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Birth Date
        </label>
        <input 
          type="date" 
          name="birthdate" 
          bind:value={birthdate} 
          class="form-control" 
          id="birthdate" 
          required>
      </div>
      <!-- col -->
      
    </div>
    <!-- row -->

    <div class="row mt-2">
      <div class="col-sm mg-t-20 mg-sm-t-0">
        <label
          for="qualification"
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Qualification
        </label>

        <select 
          name="qualification" 
          bind:value={qualification} 
          class="form-control" 
          id="qualification" 
          required>
          <option selected>-- select --</option>
          <option value="SSCE">SSCE</option>
          <option value="NCE">NCE</option>
          <option value="ND">ND</option>
          <option value="HND">HND</option>
          <option value="B.A">B.A</option>
          <option value="B.Sc">B.Sc</option>
          <option value="B.Ed">B.Ed</option>
          <option value="B.Tech">B.Tech</option>
          <option value="PGDE">PGDE</option>
          <option value="M.Sc">M.Sc</option>
        </select>
          
      </div>

      <!-- col -->
      <div class="col-sm col-sm">
        <label
          for="designation"
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Designation
        </label>
        <select 
          name="designation" 
          bind:value={designation} 
          class="form-control" 
          id="designation" 
          required>
          <option selected>-- select --</option>
          <option value="HEAD TEACHER">HEAD TEACHER</option>
          <option value="SECRETARY">SECRETARY</option>
          <option value="ASSISTANT HEAD TEACHER">ASSISTANT HEAD TEACHER</option>
          <option value="BURSAR">BURSAR</option>
          <option value="QUALITY ASSURANCE OFFICER">QUALITY ASSURANCE OFFICER</option>
          <option value="SUBJECT TEACHER">SUBJECT TEACHER</option>
          <option value="MAINTENANCE OFFICER">MAINTENANCE OFFICER</option>
          <option value="STORE KEEPER">STORE KEEPER</option>
          <option value="CLASS ASSISTANT">CLASS ASSISTANT</option>
          <option value="NANNY">NANNY</option>
          <option value="CHAPLAIN">CHAPLAIN</option>
          <option value="OFFICE ASSISTANT">OFFICE ASSISTANT</option>
          <option value="SCHOOL NURSE">SCHOOL NURSE</option>
          <option value="EXAMINATION OFFICER">EXAMINATION OFFICER</option>
          <option value="HEALTH OFFICER">HEALTH OFFICER</option>
          <option value="CARE GIVER">CARE GIVER</option>
          <option value="CLEANER">CLEANER</option>
          <option value="COMPUTER ANNALYST">COMPUTER ANNALYST</option>
          <option value="FRONT DESK OFFICER<">FRONT DESK OFFICER</option>
          <option value="DRIVER">DRIVER</option>
          <option value="RECORDS OFFICER">RECORDS OFFICER</option>
          <option value="SECURITY">SECURITY</option>
          <option value="COOK">COOK</option>
          <option value="LIBRARIAN">LIBRARIAN</option>
        </select>
      </div>
      <!-- col -->
      <div class="col-sm">
        <label
          for="discipline"
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Discipline
        </label>
        <input 
          type="text" 
          name="discipline" 
          bind:value={discipline} 
          class="form-control" 
          id="discipline" 
          required>
      </div>
      <!-- col -->
    </div>
    <!-- row -->

    <div class="row mt-2">
      <div class="col-sm mg-t-20 mg-sm-t-0">
        <label
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Staff type
        </label>
        <select 
          name="qualification" 
          bind:value={staff_type} 
          class="form-control" 
          id="qualification" 
          required>
          <option selected>-- select --</option>
          <option value="Teaching">Teaching</option>
          <option value="Non-Teaching">Non-Teaching</option>
        </select>
      </div>
      <!-- col -->
      <div class="col-4 col-sm">
        <label
          for="years_of_experience"
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Years Of Experience
        </label>
        <div class="input-group">
          <input 
          type="number"
          bind:value={years_of_experience}
          name="years_of_experience" 
          class="form-control" 
          id="years_of_experience" 
          required>
          <div class="input-group-append">
            <span class="input-group-text" id="basic-addon2">years</span>
          </div>
        </div>
      </div>
      <!-- col -->
      <div class="col-4 col-sm">
        <label
          for="employment_type"
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Employment Type
        </label>
        <select 
          name="employment_type" 
          bind:value={employment_type} 
          class="form-control" 
          id="employment_type" 
          required>
          <option selected>-- select --</option>
          <option value="Tenured">Tenured</option>
          <option value="Non-Tenured">Non-Tenured</option>
        </select>
      </div>
      <!-- col -->
      <div class="col-sm mg-t-20 mg-sm-t-0">
        <label
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Contract Type
        </label>
        <select 
          name="contract_type" 
          bind:value={contract_type}
          class="form-control" 
          id="contract_type" 
          required>
          <option selected>-- select --</option>
          <option value="Permanent">Permanent</option>
          <option value="Fixed">Fixed</option>
        </select>
      </div>
      <!-- col -->
    </div>
    <!-- row -->

    <div class="row mt-2">
    <div class="col-3 col-sm">
        <label
          for="contract_duration"
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Contract Duration
        </label>
        <div class="input-group">
          <input 
          type="text" 
          bind:value={contract_duration} 
          name="contract_duration"
          placeholder="1 year, fixed, ..." 
          class="form-control" 
          id="contract_duration" 
          required>
        </div>
      </div>
      <div class="col-3 col-sm">
        <label
          for="salary"
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Gross Salary
        </label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="gross_salary">₦</span>
          </div>
          <input 
          type="number" 
          bind:value={gross_salary} 
          name="salary" 
          class="form-control" 
          id="salary" 
          aria-labelledby="gross_salary"
          required>
        </div>
      </div>
      <!-- col -->
      <div class="col-5 col-sm">
        <label
          for="res_allowance"
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Responsibility Allowances
        </label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="res_allowance">₦</span>
          </div>
          <input 
            type="number" 
            bind:value={res_allowance}
            name="res_allowance" 
            class="form-control" 
            id="res_allowance"
            aria-labelledby="res_allowance" 
            required>
        </div>
      </div>
      <!-- col -->
      <div class="col-6 col-sm">
        <label
          for="church_membership"
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Church Membership
        </label>
        <!-- <input 
          type="text" 
          bind:value={church_membership}
          name="church_membership" 
          class="form-control" 
          id="church_membership" 
        > -->
        <select 
          name="church_membership" 
          bind:value={church_membership}
          class="form-control" 
          id="church_membership" 
          required>
          <option selected>-- select --</option>
          <option value="LFC">LFC</option>
          <option value="Pentecostal">Pentecostal</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <!-- col -->
    </div>
    <!-- row -->

    <div class="row mt-2">
      <div class="col-sm-6">
          <div class="form-group">
          <label
            for="cert_ver_status"
            class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
            tx-sans">
            Cert Ver Status
          </label>
          <input 
            type="text" 
            bind:value={cert_ver_status}
            name="cert_ver_status" 
            class="form-control" 
            id="cert_ver_status" 
          >
        </div>
        <!-- col -->
        <div class="form-group">
          <label
            for="wofbi_level"
            class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
            tx-sans ">
            Wofbi Level
          </label>
          <input 
            type="text" 
            bind:value={wofbi_level}
            name="wofbi_level" 
            class="form-control" 
            id="wofbi_level" 
          >
        </div>
      </div>
      
      <!-- col -->
      <div class="col-sm-6 col">
        <label
          for="address"
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Address
        </label>
        <textarea 
          name="address" 
          bind:value={address} 
          class="form-control" 
          id="address" 
          rows="5" 
          required
        ></textarea>
      </div>
      <!-- col -->
    </div>
     <!-- row -->   
  </form>
</section>