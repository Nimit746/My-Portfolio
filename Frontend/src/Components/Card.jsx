import React from 'react'

const Card = (props) => {
  return (
    <main>
      <div
        className={`flex mx-auto h-[25vh] rounded-xl justify-around items-center p-3 text-wrap text-center hover:scale-105 ${props.glass}`}
        style={{
          width: props.cw,
          height: props.ch,
          margin: props.cmg,
          backgroundColor: props.cbg,
          flexDirection: props.cflex,
          gap: props.cgap,
          flexWrap: props.cflexwrap,
          minWidth: "cal(min(250px, 70%))",
          animation: props.canimation,
          textAlign: props.ctxt,
        }}
      >
        <div
          className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl grdnt"
          style={{
            minWidth: props.namewid,
            color: props.namecol,
            animation: props.nanimation,
            margin: props.nmg,
            textAlign: props.ntxt,
          }}
        >
          <img
            src={props.image}
            width={props.image_width}
            height={props.image_height}
            className="rounded-xl mb-3"
          />
          {props.name}

        </div>

        <div
          className="font-bold text-sm sm:text-md md:text-lg lg:text-xl xl:text-[1.2rem] grdnt"
          style={{
            marginTop: props.imt,
            width: props.message_width,
            animation: props.manimation,
            color: props.mcol,
            textAlign: props.mtxt,
          }}
        >
          {props.message}
        </div>
      </div>
    </main>
  );
}

export default Card
