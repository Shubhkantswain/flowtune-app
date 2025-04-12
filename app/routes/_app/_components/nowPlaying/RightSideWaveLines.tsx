const RightSideWaveLines = ({ shouldHide }: { shouldHide: boolean }) => {
  return (
    <div className={`${shouldHide ? "hidden md:block" : ""} wave-lines-right`}>
      <div className="wave-line"></div>
      <div className="wave-line"></div>
      <div className="wave-line"></div>
      <div className="wave-line"></div>
      <div className="wave-line"></div>
      <div className="wave-line"></div>
      <div className="wave-line"></div>
      <div className="wave-line"></div>
      <div className="wave-line"></div>
      <div className="wave-line"></div>
      <div className="wave-line"></div>
      <div className="wave-line"></div>
      <div className="wave-line"></div>
      <div className="wave-line"></div>
      <div className="wave-line"></div>
      <div className="wave-line"></div>
      <div className="wave-line"></div>
      <div className="wave-line"></div>
      <div className="wave-line"></div>
      <div className="wave-line"></div>
    </div>
  )
}

export default RightSideWaveLines