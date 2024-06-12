import Checkbox from "../components/Checkbox";
import RippleButton from "../components/RippleButton";

interface Props {
  currentUser: any;
}

export default function CreateListing({ currentUser }: Props) {
  return (
    <div className="flex flex-col -mt-20 px-4 max-w-4xl mx-auto box-border h-[calc(100vh-80px)] bg-background">
      <h1 className="text-3xl font-semibold text-center mt-32">
        Create your property
      </h1>
      <form>
        <div className="flex flex-col gap-10 md:flex-row mt-10">
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="title"
              className="border py-2 px-3 w-full rounded-xl focus:border-none focus:outline-secondary"
              id="title"
              maxLength={62}
              minLength={10}
              required
            />
            <textarea
              placeholder="Description"
              className="border py-2 px-3 w-full rounded-xl focus:border-none focus:outline-secondary"
              id="description"
              required
            />
            <input
              type="text"
              placeholder="address"
              className="border py-2 px-3 w-full rounded-xl focus:border-none focus:outline-secondary"
              id="address"
              required
            />
            <div className="flex flex-wrap justify-between mt-6">
              <Checkbox id="sell">Sell</Checkbox>
              <Checkbox id="rent">Rent</Checkbox>
              <Checkbox id="parking">Parking Slot</Checkbox>
              <Checkbox id="furnished">Furnished</Checkbox>
              <Checkbox id="offer">Offer</Checkbox>
            </div>
            <div className="flex gap-5 sm:gap-20 mt-6">
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  id="bedroom"
                  min="0"
                  required
                  className="px-3 py-2 border w-14 sm:w-28 rounded-xl focus:border-none focus:outline-secondary"
                />
                <span>Bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bathroom"
                  min="0"
                  required
                  className="px-3 py-2 border w-14 sm:w-28 rounded-xl focus:border-none focus:outline-secondary"
                />
                <span>Bathrooms</span>
              </div>
            </div>
            <div className="flex flex-col gap-6 mt-6">
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  id="regularPrice"
                  min="0"
                  required
                  className="px-3 py-2 border w-28 rounded-xl focus:border-none focus:outline-secondary"
                />
                <div className="flex flex-col justify-center items-center">
                  <p>Regular price</p>
                  <span className="text-xs">(birr/month)</span>
                </div>
              </div>
              <div className="flex flex-gap-2 items-center gap-3">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  required
                  className="px-3 py-2 border w-28 rounded-xl focus:border-none focus:outline-secondary"
                />
                <div className="flex flex-col justify-center items-center">
                  <p>Discounted price</p>
                  <span className="text-xs">(birr/month)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 mt-6 sm:mt-0">
            <p className="font-bold">
              Images:{" "}
              <span className="font-normal text-gray-600">
                Inset your property images (max: 10)
              </span>
            </p>
            <div className="flex gap-4 mt-4">
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                className="border w-9/12 border-gray-400 p-2 rounded-2xl"
              />
              <button className="border-secondary p-2 rounded-2xl bg-secondary font-semibold text-fontColor">
                Upload
              </button>
            </div>
          </div>
        </div>
        <RippleButton className="p-3 bg-primary rounded-2xl text-background mt-10 w-full text-xl">
          Create Property
        </RippleButton>
      </form>
    </div>
  );
}
