// TODO IMPORTS -------------------------------------------------------------------------------- //
import Swal from "sweetalert2";
import "./Login.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

// TODO LOGIN --------------------------------------------------------------------------------- //
export default function LogOut({ token }) {
  let timer;

  if (token) {
    Swal.fire({
      title: "A terminar sessão...",
      html: "A sessão encerrará em <b></b> milisegundos.",
      timer: 1500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        timer = setInterval(() => {
          const content = Swal.getContent();
          if (content) {
            const b = content.querySelector("b");
            if (b) {
              b.textContent = Swal.getTimerLeft();
            }
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timer);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("Sessão terminada!");
        localStorage.clear(token);
        window.location.href = "/";
      }
    });
    return null;
  }
}
