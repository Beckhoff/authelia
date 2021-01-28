import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
document.body.setAttribute("data-basepath", "");
document.body.setAttribute("data-rememberme", "true");
document.body.setAttribute("data-resetpassword", "true");
document.body.setAttribute("data-systemusenotification", "Access for authorized personnel only!");
configure({ adapter: new Adapter() });
