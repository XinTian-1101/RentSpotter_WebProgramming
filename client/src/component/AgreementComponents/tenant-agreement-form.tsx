import { useForm } from "react-hook-form";
import { lesseeAgreeementSchema } from "schemas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardWrapper } from "./card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { useState, useTransition } from "react";
import { Input } from "components/ui/input";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { Button } from "components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  lesseeFormValues,
  lesseeSignature,
  lesseeSignatureUrl,
} from "./agreement-signals";
import { effect } from "@preact/signals";

export const TenantAgreementForm = () => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [effectiveStartDate, setEffectiveStartDate] = useState<Date>();
  const form = useForm<z.infer<typeof lesseeAgreeementSchema>>({
    resolver: zodResolver(lesseeAgreeementSchema),
    defaultValues: {
      lesseeIc: "000000",
      lesseeDesignation: "Mr.",
      lesseeSignature: new File([], ""),
    },
  });

  const fileReader = new FileReader();

  effect(() => {
    console.log("run");

    if (lesseeSignature.value) {
      fileReader.onload = (e) => {
        const result = e.target?.result;
        if (result) {
          lesseeSignatureUrl.value = result as string | undefined;
        }
      };
      fileReader.readAsDataURL(lesseeSignature.value);
    }
  });

  const onSubmit = (values: z.infer<typeof lesseeAgreeementSchema>) => {
    if (!lesseeSignature.value || lesseeSignature.value.size === 0) {
      setError("Please upload signature");
      return;
    }
    setError("");
    setSuccess("");
    startTransition(() => {
      lesseeFormValues.value = values;

      localStorage.setItem(
        "lesseeFormValues",
        JSON.stringify(lesseeFormValues.value)
      );
      localStorage.setItem(
        "lesseeSignature",
        JSON.stringify(lesseeSignature.value)
      );
      localStorage.setItem(
        "lesseeSignatureUrl",
        JSON.stringify(lesseeSignatureUrl.value)
      );
      // console.log(JSON.parse(localStorage.getItem("lesseeFormValues") || ""));

      // console.log(JSON.parse(localStorage.getItem("lesseeSignature") || ""));

      // console.log(JSON.parse(localStorage.getItem("lesseeSignatureUrl") || ""));
      // console.log(localStorage.getItem("lesseeSignatureUrl"));

      navigate("/tenantLeaseAgreementPg1");
    });
  };

  return (
    <>
      <section className="flex justify-center p-8">
        <CardWrapper
          headerLabel="Agreement Form"
          subheaderLabel="Fill in all details"
        >
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="lesseeIc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lessee IC</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          placeholder="000101-14-XXXX"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lesseeDesignation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lessee Designation</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          placeholder="Ms."
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lesseeSignature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Signature file</FormLabel>
                      <FormControl>
                        <Input
                          accept=".jpg, .jpeg, .png"
                          type="file"
                          onChange={(e) =>
                            field.onChange(
                              (lesseeSignature.value = e.target.files
                                ? e.target.files[0]
                                : null)
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button
                type="submit"
                className="w-full rounded-lg bg-dark-orange"
                disabled={isPending}
              >
                Submit
              </Button>
            </form>
          </Form>
        </CardWrapper>
      </section>
    </>
  );
};
export { lesseeFormValues };
