@keyframes sucessoEntrada {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes checkPulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 40px rgba(245, 215, 110, 0.5), 0 0 80px rgba(245, 215, 110, 0.25);
  }
  50% {
    transform: scale(1.08);
    box-shadow: 0 0 55px rgba(245, 215, 110, 0.75), 0 0 110px rgba(245, 215, 110, 0.4);
  }
}
