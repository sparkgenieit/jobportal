import './Header.css';

function Heder() {
  return <>
    <header id="header" class="header fixed-top" data-scrollto-offset="0">
      <div class="container-fluid d-flex align-items-center justify-content-between">

        <a href="index.html" class="logo d-flex align-items-center scrollto me-auto me-lg-0">

          <h2>Working Holiday Jobs New Zealand</h2>

        </a>

        <nav id="navbar" class="navbar d-flex ">
          <ul>

            <li><a class="nav-link scrollto mx-3" href="index.html#about">Home</a></li>

            <li><a class="nav-link scrollto mx-3" href="index.html#about">Jobs</a></li>

            <li class="dropdown">
              <a href="#" class="menu-item first-item expand-btn">Info</a>
              <ul class="dropdown-menu sample">
                <li><a href="about-wfh-visa.html">About WH visa</a></li>
                <li><a href="user-registration.html">Banking</a></li>
                <li><a href="company/index.html">Tax</a></li>
                <li><a href="company/index.html">Types of work</a></li>
                <li><a href="company/index.html">Useful Links</a></li>
                <li><a href="company/index.html">News</a></li>
                <li class="dropdown dropdown-right">
                  <a href="#" class="menu-item expand-btn">
                    Travel
                  </a>
                  <ul class="menu-right menu-left sample">
                    <li><a href="#">Transport</a></li>
                    <li><a href="#">Accommodation</a></li>
                    <li><a href="places.html">Places</a></li>
                    <li><a href="company/index.html">Holiday Parks</a></li>
                    <li><a href="company/index.html">Freedom Camping</a></li>
                    <li><a href="#">Activities</a></li>
                  </ul>
                </li>
              </ul>
            </li>


            <li><a class="nav-link scrollto mx-3" href="index.html#about">Login</a></li>

          </ul>
          <i class="bi bi-list mobile-nav-toggle d-none"></i>
        </nav>

        <a class="btn-getstarted scrollto" href="index.html#about">Get Started</a>

      </div>
    </header>
  </>
}

export default Heder;
