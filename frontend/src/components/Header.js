import logoHeader from '../images/logo.svg';
function Header(props){
  return(<header className="header">
  <img
    className="header__logo"
    src={logoHeader}
    alt="Логотип Место"
  />
  {props.children}
</header>)
}
export default Header;