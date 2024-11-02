import "./ImageResizer.css"

import { useEffect, useRef, useState } from "react";

export default function Input({ width, height, setImg, imgSrc }) {
    const [croppedWidth, setCroppedWidth] = useState(width)
    const [croppedHeight, setCroppedHeight] = useState(height)
    const imgRef = useRef(null);
    const [originalImageUrl, setOriginalImageUrl] = useState(null)

    const imgContainer = {
        width: `${width}px`,
        height: `${height}px`,
        overflow: "hidden",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#40404"
    }

    useEffect(() => {
        let isMounted = true

        const fetchImage = async () => {

            const data = await fetch(imgSrc)

            if (isMounted) {
                const blob = await data.blob()

                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onload = function (e) {

                    let image_url = e.target.result

                    const img = new Image();

                    img.src = image_url;

                    img.onload = function () {
                        const canvas = document.createElement("canvas");
                        const ctx = canvas.getContext("2d");

                        canvas.width = width
                        canvas.height = height

                        // Actual resizing
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                        const dataurl = canvas.toDataURL("image/jpeg");

                        if (imgRef.current) {
                            imgRef.current.src = dataurl
                        }

                        canvas.remove()
                    }
                }
            }
        }

        fetchImage()

        return () => {
            isMounted = false
        }
    }, [imgSrc])


    const handleHeightSlider = (e) => {
        const value = Number(e.target.value)

        const img = new Image();

        img.src = originalImageUrl;

        img.onload = function () {

            const canvas = document.createElement("canvas")

            const ctx = canvas.getContext("2d")

            canvas.width = width
            canvas.height = height

            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const widthToStart = (width - croppedWidth) / 2
            const heightToStart = (height - value) / 2

            ctx.drawImage(img, widthToStart, heightToStart, croppedWidth, value)

            const imageUrl = canvas.toDataURL("image/jpeg")

            imgRef.current.src = imageUrl

            setCroppedHeight(value)

            canvas.toBlob((blob) => {
                setImg(blob)
            }, 'image/jpeg')

            canvas.remove()
        }
    }

    const handleWidthSliders = (e) => {

        const value = Number(e.target.value)

        const img = new Image();

        img.src = originalImageUrl;

        img.onload = function () {

            const canvas = document.createElement("canvas")

            const ctx = canvas.getContext("2d")

            canvas.width = width
            canvas.height = height

            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const widthToStart = (width - value) / 2
            const heightToStart = (height - croppedHeight) / 2

            ctx.drawImage(img, widthToStart, heightToStart, value, croppedHeight)

            const imageUrl = canvas.toDataURL("image/jpeg")

            imgRef.current.src = imageUrl

            setCroppedWidth(value)

            canvas.toBlob((blob) => {
                setImg(blob)
            }, 'image/jpeg')

            canvas.remove()
        }
    }


    return (
        <div>
            <div className="d-flex gap-4 align-items-center">
                <div
                    style={imgContainer}
                    className="rounded d-flex align-items-center justify-content-center"
                >
                    <img className="rounded img-resize" ref={imgRef} />
                </div>
                <div style={{ width: "10px" }}>
                    <input
                        type="range"
                        name="height"
                        onChange={(e) => { handleHeightSlider(e) }}
                        defaultValue={height}
                        min={10}
                        max={height}
                        className="height-slider"
                        style={{ height: `${height}px` }}
                    />
                </div>
            </div>
            <input
                type="range"
                name="width"
                className="slider"
                onChange={(e) => handleWidthSliders(e)}
                defaultValue={width}
                min={10}
                max={width}
                style={{ width: `${width}px` }}
            />
        </div>
    );
}
