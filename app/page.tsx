import { LocaleProvider } from './context/LocaleContext';
import Header from './components/Header';
import LandingContent from './components/LandingContent';

export default function Home() {
  return (
    <LocaleProvider>
      <Header />
      <LandingContent />
    </LocaleProvider>
  );
}
