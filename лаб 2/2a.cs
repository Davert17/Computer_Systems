using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2a
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введіть ділене");
            int divident = int.Parse(Console.ReadLine());
            Console.WriteLine("Введіть дільник");
            int divisor = int.Parse(Console.ReadLine());
            Divide(divident, divisor);
            Console.ReadKey();

        }

        static void Divide(int divident, int divisor)
        {


            if (divisor == 0)
            {
                throw new DivideByZeroException();
            }

            var def = string.Empty;
            var dividentAbs = Math.Abs(divident);
            var divisorAbs = Math.Abs(divisor);
            int remainder = 0, quotient = 0;

            if (dividentAbs < divisorAbs)
            {
                quotient = divident;
                def += "Ділене < дільника, тож частка = діленому , результат = 0\n";
            }
            else
            {
                int lenA, lenB, k;
                int temporal = dividentAbs;

                def += $"{Convert.ToString(dividentAbs, 2)} модуль Діленого\n";
                def += $"{Convert.ToString(divisorAbs, 2)} модуль Дільника\n\n";

                for (lenA = 0; temporal != 0; temporal >>= 1, lenA++) ;
                temporal = divisorAbs;
                for (lenB = 0; temporal != 0; temporal >>= 1, lenB++) ;
                k = lenA - lenB;
                divisorAbs <<= k;

                def += $"дільник \n";
                def += $"{Convert.ToString(dividentAbs, 2)} ділене\n";
                def += $"{Convert.ToString(divisorAbs, 2)} дільник\n\n";
                quotient = dividentAbs - divisorAbs;
                remainder = quotient < 0 ? 0 : 1;
                def += $"різниця ділене & дільник \n";
                def += $"частка = {Convert.ToString(quotient, 2)} \n";
                def += $"результат = {Convert.ToString(remainder, 2)} \n\n";
                for (int i = 0; i < k; i++)
                {
                    divisorAbs >>= 1;
                    def += $"{Convert.ToString(divisorAbs, 2)}  дільник зсув вправо\n";
                    if (quotient < 0)
                    {
                        quotient += divisorAbs;
                        def += $"{Convert.ToString(quotient, 2)} сума частки & дільника\n";
                    }
                    else
                    {
                        quotient += -divisorAbs;
                        def += $"{Convert.ToString(quotient, 2)} різниця частки & дільника\n";
                    }
                    remainder <<= 1;
                    if (quotient >= 0)
                    {
                        remainder++;
                    }

                    def += $"{Convert.ToString(remainder, 2)} результат зсув вправо {(quotient >= 0 ? "& + 1" : "")}\n\n";
                }
                if (quotient < 0)
                {
                    def += "визначио результат\n";
                    quotient += divisorAbs;
                    def += $"{Convert.ToString(quotient, 2)} частка += |дільник| \n\n";
                }
                
                if (divident < 0)
                {
                    if (divisor > 0)
                    {
                        remainder = -remainder;
                    }

                    quotient = -quotient;
                }
                if (divident > 0 && divisor < 0)
                {
                    remainder = -remainder;
                }

                def += $"результат = {Convert.ToString(remainder, 2)} частка = {Convert.ToString(quotient, 2)}\n";
            }

            Console.WriteLine(" {0}", def);
            Console.WriteLine("результат = {0}, частка = {1}", remainder, quotient);
        }
    }
}
