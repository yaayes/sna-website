/**
 * PhotoCropModal
 *
 * Social-media-style crop step for representative photos.
 * Renders a 4:3 drag/zoom interface and exports a cropped JPEG File
 * before the form is submitted.
 *
 * Usage:
 *   <PhotoCropModal
 *     imageSrc={objectURL}          // e.g. URL.createObjectURL(file)
 *     open={showCrop}
 *     onClose={() => setShowCrop(false)}
 *     onConfirm={(croppedFile) => { ... }}
 *   />
 */

import { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import type { Area } from 'react-easy-crop';
import 'react-easy-crop/react-easy-crop.css';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';

/** Aspect ratio used on the public /representants card (h-56 w-full ≈ 4:3). */
const ASPECT_RATIO = 4 / 3;

/** Output width in pixels of the saved JPEG. */
const OUTPUT_WIDTH = 800;
const OUTPUT_HEIGHT = Math.round(OUTPUT_WIDTH / ASPECT_RATIO); // 600

/**
 * Draws the cropped region of `imageSrc` onto an offscreen canvas
 * and resolves to a JPEG Blob (quality 0.88).
 */
async function getCroppedBlob(imageSrc: string, croppedAreaPixels: Area): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => {
            const canvas = document.createElement('canvas');
            canvas.width = OUTPUT_WIDTH;
            canvas.height = OUTPUT_HEIGHT;
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                reject(new Error('Canvas context unavailable'));

                return;
            }

            ctx.drawImage(
                image,
                croppedAreaPixels.x,
                croppedAreaPixels.y,
                croppedAreaPixels.width,
                croppedAreaPixels.height,
                0,
                0,
                OUTPUT_WIDTH,
                OUTPUT_HEIGHT,
            );
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error('Canvas toBlob returned null'));
                    }
                },
                'image/jpeg',
                0.88,
            );
        });
        image.addEventListener('error', reject);
        image.src = imageSrc;
    });
}

type Props = {
    imageSrc: string;
    open: boolean;
    onClose: () => void;
    onConfirm: (croppedFile: File) => void;
    originalFileName?: string;
};

export default function PhotoCropModal({ imageSrc, open, onClose, onConfirm, originalFileName }: Props) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [processing, setProcessing] = useState(false);

    const onCropComplete = useCallback((_: Area, areaPixels: Area) => {
        setCroppedAreaPixels(areaPixels);
    }, []);

    const handleConfirm = async () => {
        if (!croppedAreaPixels) {
return;
}

        setProcessing(true);

        try {
            const blob = await getCroppedBlob(imageSrc, croppedAreaPixels);
            const baseName = originalFileName
                ? originalFileName.replace(/\.[^.]+$/, '')
                : 'photo';
            const file = new File([blob], `${baseName}.jpg`, { type: 'image/jpeg' });
            onConfirm(file);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="flex max-h-[90dvh] w-full flex-col gap-0 p-0 sm:max-w-xl">
                <DialogHeader className="border-b p-5">
                    <DialogTitle>Recadrer la photo</DialogTitle>
                    <p className="text-sm text-muted-foreground">
                        Déplacez et zoomez pour centrer le visage dans le cadre.
                    </p>
                </DialogHeader>

                {/* Crop area */}
                <div className="relative h-[360px] overflow-hidden">
                    {/* Blurred background — same image, scaled up slightly to hide blur edges */}
                    <img
                        src={imageSrc}
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl brightness-75"
                    />
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        minZoom={0.5}
                        aspect={ASPECT_RATIO}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                        showGrid={false}
                        style={{
                            containerStyle: { borderRadius: 0, background: 'transparent' },
                            cropAreaStyle: { border: '2px solid rgba(255,255,255,0.85)', boxShadow: '0 0 0 9999px rgba(0,0,0,0.45)' },
                        }}
                    />
                </div>

                {/* Zoom slider */}
                <div className="border-t bg-gray-50 px-6 py-3">
                    <label htmlFor="crop-zoom" className="mb-1.5 block text-xs font-medium text-gray-500">
                        Zoom
                    </label>
                    <input
                        id="crop-zoom"
                        type="range"
                        min={0.5}
                        max={3}
                        step={0.01}
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="h-1.5 w-full cursor-pointer accent-sna-teal"
                    />
                </div>

                <DialogFooter className="border-t p-4">
                    <DialogClose asChild>
                        <Button variant="outline" type="button" onClick={onClose}>
                            Annuler
                        </Button>
                    </DialogClose>
                    <Button type="button" onClick={handleConfirm} disabled={processing}>
                        {processing ? 'Traitement…' : 'Valider le cadrage'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
