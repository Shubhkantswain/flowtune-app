const LeftSideWaveLines = ({ shouldHide }: { shouldHide: boolean }) => {
    return (
        <div className={`${shouldHide ? "hidden md:block" : ""} wave-lines-left`}>
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

export default LeftSideWaveLines