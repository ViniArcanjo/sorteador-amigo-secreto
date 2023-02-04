import style from './Header.module.scss';
import logo from '../../assets/images/logo-pequeno.png';
import participant from '../../assets/images/participante.png';

export function Header() {
  return (
    <header className={style.header_wrapper}>
      <img src={logo} alt='logo' />
      <img
        className={style.participant}
        src={participant}
        alt='Imagem Ilustrativa de Participante'
      />
    </header>
  );
}
