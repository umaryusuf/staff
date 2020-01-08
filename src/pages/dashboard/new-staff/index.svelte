<script>

let staffData = {};

</script>


<section class="content-body">
  <div id="contactInformation" class="content" style="background: white;">
            
    <div class="d-flex align-items-center justify-content-between mg-b-25">
      <h6 class="mg-b-0">Create New Staff</h6>
      <div class="d-flex">
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
        <input type="text" name="fullname" class="form-control" id="fullname">
      </div>
      <!-- col -->
      <div class="col-6 col-sm-4">
        <label
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Phone
        </label>
        <input type="tel" name="phone" class="form-control" id="phone">
      </div>

      <div class="col-6 col-sm-4">
        <label
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Email
        </label>
        <input type="email" name="email" class="form-control" id="email">
      </div>
      <!-- col -->
    </div>
    <!-- row -->

    <div class="row mt-3">
      <div class="col-4 col-sm">
        <label
          for="sex"
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Sex
        </label>
        <select name="sex" class="form-control" id="fullname">
          <option value="">-- select --</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div class="col-4 col-sm">
        <label
          for="marital_status"
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Marital Status
        </label>
        <select name="marital_status" class="form-control" id="marital_status">
          <option value="">-- select --</option>
          <option value="single">Single</option>
          <option value="married">Married</option>
        </select>
      </div>
      <!-- col -->
      <div class="col-4 col-sm">
        <label
          for="doe"
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Date Of Entry
        </label>
        <input type="date" name="doe" class="form-control" id="doe">
      </div>
      <!-- col -->

      <div class="col-sm mg-t-20 mg-sm-t-0">
        <label
          for="dob"
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Birth Date
        </label>
        <input type="date" name="dob" class="form-control" id="dob">
      </div>
      <!-- col -->
      
    </div>
    <!-- row -->

    <div class="row mt-3">
      <div class="col-sm mg-t-20 mg-sm-t-0">
        <label
          for="qualification"
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Qualification
        </label>
        <select name="qualification" class="form-control" id="qualification">
          <option value="">-- select --</option>
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
      <div class="col-4 col-sm">
        <label
          for="designation"
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Designation
        </label>
        <select name="designation" class="form-control" id="designation">
          <option value="">-- select --</option>
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
      <div class="col-4 col-sm">
        <label
          for="discipline"
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Discipline
        </label>
        <input type="text" name="discipline" class="form-control" id="discipline">
      </div>
      <!-- col -->
    </div>
    <!-- row -->

    <div class="row mt-3">
      <div class="col-sm mg-t-20 mg-sm-t-0">
        <label
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Staff type
        </label>
        <select name="qualification" class="form-control" id="qualification">
          <option value="">-- select --</option>
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
        <input type="number" name="years_of_experience" class="form-control" id="years_of_experience">
      </div>
      <!-- col -->
      <div class="col-4 col-sm">
        <label
          for="employment_type"
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Employment Type
        </label>
        <select name="employment_type" class="form-control" id="employment_type">
          <option value="">-- select --</option>
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
        <select name="contract_type" class="form-control" id="contract_type">
          <option value="">-- select --</option>
          <option value="Permanent">Permanent</option>
          <option value="Fixed">Fixed</option>
        </select>
      </div>
      <!-- col -->
    </div>
    <!-- row -->

    <div class="row mt-3">
      <div class="col-3 col-sm">
        <label
          for="salary"
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Gross Salary
        </label>
        <input type="text" name="salary" class="form-control" id="salary">
      </div>
      <!-- col -->
      <div class="col-5 col-sm">
        <label
          for="res_allowance"
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Responsibility Allowances
        </label>
        <input type="text" name="res_allowance" class="form-control" id="res_allowance">
      </div>
      <!-- col -->
      <div class="col-6 col-sm">
        <label
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Church Membership
        </label>
        <input type="text" name="cm" class="form-control" id="cm">
      </div>
      <!-- col -->
    </div>
    <!-- row -->

    <div class="row mt-3">
      <!-- <div class="col-6 col-sm">
        <label
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Vert Ver Status
        </label>
        <p class="mg-b-0">{staffData.cert_ver_status}</p>
      </div> -->
      <!-- col -->
      <div class="col-6 col-sm">
        <label
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Wofbi Level
        </label>
        <input type="text" name="wl" class="form-control" id="wl">
      </div>
      <!-- col -->
      <div class="col-sm mg-t-20 mg-sm-t-0">
        <label
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Disciplinary Cases
        </label>
        <input type="text" name="dc" class="form-control" id="dc">
      </div>
      
    </div>
    <!-- row -->
    <div class="row mt-3 mb-5">
      <!-- col -->
      <div class="col-md">
        <label
          for="address"
          class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
          tx-sans mg-b-10">
          Address
        </label>
        <textarea name="address" class="form-control" id="address"rows="6"></textarea>
      </div>
    </div>

    <button type="submit" class="btn btn-block btn-bg btn-primary">Create New Staff</button>   
  </div>
</section>