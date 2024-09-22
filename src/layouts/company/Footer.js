import './Footer.css';

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container-fluid d-flex justify-content-between">
          <span className="text-muted d-block text-center text-sm-start d-sm-inline-block">Copyright © Spark Genie It
            Solutions
            2023</span>
          <span className="float-none float-sm-end mt-1 mt-sm-0 text-end"> <a href="https://sparkgenieit.com/"
            target="_blank">Spark Genie It Solutions
            team</a></span>
        </div>
      </footer>
    </>
  );
}

export default Footer;
