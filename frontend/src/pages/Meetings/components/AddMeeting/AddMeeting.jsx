import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../../../components/ui/dialog';
import { FiPlus } from 'react-icons/fi';
import { Label } from '../../../../components/ui/label';
import { Input } from '../../../../components/ui/input';
import { Checkbox } from '../../../../components/ui/checkbox';
import { Button } from '../../../../components/ui/button';
import { useState } from 'react';

const AddMeeting = () => {
    const [name, setname] = useState("")
    const [date, setdate] = useState("")
    const [timeFrom, settimeFrom] = useState("")
    const [timeTo, settimeTo] = useState("")
    const [fees, setfees] = useState("")
     const validateForm = () => {
    if (!name) {
      toast.error("Name is Required");
      return;
    }
    if (!date) {
      toast.error("Date is Required");
      return;
    }
    if (!timeFrom) {
      toast.error("Time is Required");
      return;
    }
    if (!timeTo) {
      toast.error("Time is Required");
      return;
    }
  };
  return (
    <Dialog className="">
      <form>
        <DialogTrigger asChild>
          <Button
            className="inline-flex cursor-pointer items-center hover:-translate-y-1.5 transition-all duration-500 justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium shadow-sm"
            variant="outline"
          >
            <FiPlus /> Add New
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-[#1a1d21] outline-none border-none text-white">
          <DialogHeader>
            <DialogTitle>Add New Meeting</DialogTitle>
            <DialogDescription>
              Description for adding the meeting
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label>Name</Label>
              <Input
                type={"text"}
                name="name"
                placeholder="Enter New Admin Name"
              />
            </div>
            <div className="grid gap-3">
              <Label>Fees</Label>
              <Input
                name="fees"
                type={"text"}
                placeholder="Enter the Amount"
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                className={
                  "cursor-pointer bg-white px-2.5 rounded-lg font-semibold text-black hover:bg-[#171717] outline-none border-none hover:text-white"
                }
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={() => {
                validateForm();
                handleSubmitNewAdminDetails();
              }}
              type="submit"
              className={
                "cursor-pointer bg-black px-2.5 py-2 rounded-lg font-semibold hover:bg-gray-200 hover:text-black"
              }
            >
              Add Meeting
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default AddMeeting